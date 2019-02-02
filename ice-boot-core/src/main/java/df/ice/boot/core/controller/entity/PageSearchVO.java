package df.ice.boot.core.controller.entity;

import java.io.Serializable;
import java.util.List;

/**
 * Created by df on 2019/1/16.
 */
public class PageSearchVO<T> implements Serializable {

    //当前页
    private int pageNum = 1;
    //每页的数量
    private int pageSize = 15;

    //总数
    private long pageTotal = 0;

    //查询条件字符串
    private Object condition;

    public Object getCondition() {
        return condition;
    }

    public void setCondition(Object condition) {
        this.condition = condition;
    }

    //实际返回数据
    private List<T> list;

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public long getPageTotal() {
        return pageTotal;
    }

    public void setPageTotal(long pageTotal) {
        this.pageTotal = pageTotal;
    }

    @Override
    public String toString() {
        return "PageSearchVO{" +
            "pageNum=" + pageNum +
            ", pageSize=" + pageSize +
            ", pageTotal=" + pageTotal +
            ", list=" + list +
            '}';
    }
}
