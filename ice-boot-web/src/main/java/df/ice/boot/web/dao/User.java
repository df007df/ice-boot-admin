package df.ice.boot.web.dao;

import df.ice.boot.core.dao.BaseDao;
import java.util.Date;
import javax.persistence.*;

@Table(name = "user_base")
public class User extends BaseDao {
    @Id
    @Column(name = "id")
    private Integer id;

    /**
     * 姓名
     */
    @Column(name = "name")
    private String name;

    /**
     * 年龄
     */
    @Column(name = "age")
    private Integer age;

    /**
     * 是否通过
     */
    @Column(name = "is_pass")
    private Boolean isPass;

    /**
     * 创建时间
     */
    @Column(name = "gmt_create")
    private Date gmtCreate;

    @Column(name = "gmt_modified")
    private Date gmtModified;

    public static final String ID = "id";

    public static final String NAME = "name";

    public static final String AGE = "age";

    public static final String IS_PASS = "isPass";

    public static final String GMT_CREATE = "gmtCreate";

    public static final String GMT_MODIFIED = "gmtModified";

    /**
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取姓名
     *
     * @return name - 姓名
     */
    public String getName() {
        return name;
    }

    /**
     * 设置姓名
     *
     * @param name 姓名
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 获取年龄
     *
     * @return age - 年龄
     */
    public Integer getAge() {
        return age;
    }

    /**
     * 设置年龄
     *
     * @param age 年龄
     */
    public void setAge(Integer age) {
        this.age = age;
    }

    /**
     * 获取是否通过
     *
     * @return is_pass - 是否通过
     */
    public Boolean getIsPass() {
        return isPass;
    }

    /**
     * 设置是否通过
     *
     * @param isPass 是否通过
     */
    public void setIsPass(Boolean isPass) {
        this.isPass = isPass;
    }

    /**
     * 获取创建时间
     *
     * @return gmt_create - 创建时间
     */
    public Date getGmtCreate() {
        return gmtCreate;
    }

    /**
     * 设置创建时间
     *
     * @param gmtCreate 创建时间
     */
    public void setGmtCreate(Date gmtCreate) {
        this.gmtCreate = gmtCreate;
    }

    /**
     * @return gmt_modified
     */
    public Date getGmtModified() {
        return gmtModified;
    }

    /**
     * @param gmtModified
     */
    public void setGmtModified(Date gmtModified) {
        this.gmtModified = gmtModified;
    }
}