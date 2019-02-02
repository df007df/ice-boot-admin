package df.ice.boot.core.service.impl;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import com.alibaba.fastjson.JSON;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import df.ice.boot.core.controller.entity.PageSearchFieldsVO;
import df.ice.boot.core.controller.entity.PageSearchVO;
import df.ice.boot.core.service.MapperCurdService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import tk.mybatis.mapper.common.Mapper;

/**
 * Created by df on 2019/1/15.
 */
public abstract class MapperCurdServiceImpl<T> implements MapperCurdService<T> {

    static final Logger logger = LoggerFactory.getLogger(MapperCurdServiceImpl.class);

    @Autowired
    protected Mapper<T> mapper;

    protected Class<T> example;

    public MapperCurdServiceImpl() {
        ParameterizedType pt = (ParameterizedType)this.getClass().getGenericSuperclass();
        example = (Class<T>)pt.getActualTypeArguments()[0];
    }

    @Override
    public T selectByPrimaryKey(Object pk) {
        return mapper.selectByPrimaryKey(pk);
    }

    @Override
    public List<T> selectByPrimaryKeys(Iterable<Object> pks) {

        return mapper.selectByExample(null);
    }

    @Override
    public List<T> selectByExample(Object example) {
        Assert.notNull(example, "example is not null");
        return mapper.selectByExample(example);
    }

    @Override
    public List<T> selectAll() {
        return mapper.selectAll();
    }

    @Override
    public PageInfo<T> selectByPage(PageSearchVO<T> pageSearchVO) {

        PageHelper.startPage(pageSearchVO.getPageNum(), pageSearchVO.getPageSize());
        List<T> list = mapper.selectByExample(pageSearchVO.getCondition());
        PageInfo page = new PageInfo(list);
        return page;
    }

    @Override
    public PageInfo<T> selectByPage(PageSearchFieldsVO<T> pageSearchVO) {

        PageHelper.startPage(pageSearchVO.getPageNum(), pageSearchVO.getPageSize());
        List<T> list = mapper.selectByExample(pageSearchVO.conditionToExample());
        PageInfo page = new PageInfo(list);
        return page;
    }

    @Override
    public int insertSelective(T dao) {
        int rows = mapper.insertSelective(dao);
        if (rows >= 1) {
            logger.info("insertSelective success result: `{}`, rows `{}`", JSON.toJSONString(dao), rows);
        }
        return rows;
    }

    @Override
    public int deleteByPrimaryKey(Object pk) {
        return mapper.deleteByPrimaryKey(pk);
    }

    @Override
    public int deleteByExample(Object example) {
        return mapper.deleteByExample(example);
    }

    @Override
    public T updateByPrimaryKeySelective(Object key, T dao) {
        T row = this.selectByPrimaryKey(key);
        if (row != null) {
            if (mapper.updateByPrimaryKeySelective(dao) == 1) {
                T newRow = this.selectByPrimaryKey(key);
                logger.info("updateByPrimaryKeySelective success: `{}` update to `{}`", JSON.toJSONString(row),
                    JSON.toJSONString(newRow));
                return newRow;
            }
        }
        return null;
    }

    @Override
    public int updateByPrimaryKeySelective(T dao) {
        return mapper.updateByPrimaryKeySelective(dao);
    }

    @Override
    public int updateByExampleSelective(T dao, Object example) {
        return mapper.updateByExampleSelective(dao, example);
    }

}
