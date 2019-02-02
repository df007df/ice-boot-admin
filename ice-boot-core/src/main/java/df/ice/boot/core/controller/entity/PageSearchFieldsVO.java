package df.ice.boot.core.controller.entity;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

/**
 * ice搜索组装使用字段相关信息组装类
 * Created by df on 2019/1/16.
 */
public class PageSearchFieldsVO<T> extends PageSearchVO<T> {

    private Class<?> example;

    public void setExample(Class<?> example) {
        this.example = example;
    }

    /**
     * 排序字段
     */
    public String orderKey;

    /**
     * 排序类型
     */
    public String orderType;

    public String getOrderKey() {
        return orderKey;
    }

    public void setOrderKey(String orderKey) {
        this.orderKey = orderKey;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    //查询条件字符串
    private Map<String, String> condition = new HashMap();

    public void setCondition(Map<String, String> condition) {
        this.condition = condition;
    }

    @Override
    public Map<String, String> getCondition() {
        return condition;
    }

    /**
     * params转换为 example
     *
     * @return
     */
    public Object conditionToExample() {

        Example example = new Example(this.example);
        if (!this.getOrderKey().equals("")) {
            example.setOrderByClause(this.getOrderKey() + " " + this.getOrderType().toUpperCase());
        }

        Criteria criteria = example.createCriteria();

        for (Map.Entry<String, String> entry : this.condition.entrySet()) {
            System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());

            String key = entry.getKey();
            String value = entry.getValue();

            int j = value.indexOf("|");
            String opt = value.substring(0, j);
            String values = value.substring(j + 1);

            System.out.println(opt);
            System.out.println(values);

            switch (opt) {
                case "=":
                    criteria.andEqualTo(key, values);
                    break;
                case ">":
                    criteria.andGreaterThanOrEqualTo(key, values);
                    break;
                case "like":
                    criteria.andLike(key, values + "%");
                    break;
                case "in":
                    String[] list = values.split(",");
                    criteria.andIn(key, Arrays.asList(list));
                    break;
                default:
            }
        }

        return example;
    }

    /**
     * ice 列表搜索字段信息
     */
    static public class Condition {

        /**
         * 数据对应的
         */
        private String name;
        private String opt;

        private Object value;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getOpt() {
            return opt;
        }

        public void setOpt(String opt) {
            this.opt = opt;
        }

        public Object getValue() {
            return value;
        }

        public void setValue(Object value) {
            this.value = value;
        }
    }
}
