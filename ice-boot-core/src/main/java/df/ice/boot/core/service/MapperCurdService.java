package df.ice.boot.core.service;

import java.util.List;

import com.github.pagehelper.PageInfo;
import df.ice.boot.core.controller.entity.PageSearchFieldsVO;
import df.ice.boot.core.controller.entity.PageSearchVO;

/**
 * Created by df on 2019/1/16.
 */
public interface MapperCurdService<T> {

    /**
     * 查询主键数据
     *
     * @param pk
     * @return
     */
    T selectByPrimaryKey(Object pk);

    List<T> selectByPrimaryKeys(Iterable<Object> pks);

    List<T> selectByExample(Object example);

    List<T> selectAll();

    /**
     * 分页查询
     *
     * @param pageSearchVO
     * @return
     */
    PageInfo<T> selectByPage(PageSearchVO<T> pageSearchVO);

    /**
     * 分页查询
     *
     * @param pageSearchVO
     * @return
     */
    PageInfo<T> selectByPage(PageSearchFieldsVO<T> pageSearchVO);

    /**
     * 新增数据
     *
     * @return
     */
    int insertSelective(T dao);

    /**
     * 更新数据
     *
     * @param dao
     * @return
     */
    int updateByPrimaryKeySelective(T dao);

    T updateByPrimaryKeySelective(Object key, T dao);

    int updateByExampleSelective(T dao, Object example);

    int deleteByPrimaryKey(Object pk);

    /**
     * 删除数据
     *
     * @param example
     * @return
     */
    int deleteByExample(Object example);

}
