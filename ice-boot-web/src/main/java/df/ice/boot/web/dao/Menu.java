package df.ice.boot.web.dao;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import df.ice.boot.core.dao.BaseDao;

@Table(name = "menu")
public class Menu extends BaseDao {
    @Id
    @Column(name = "id")
    private Integer id;

    /**
     * 名称
     */
    @Column(name = "name")
    private String name;

    /**
     * 标号
     */
    @Column(name = "code")
    private String code;

    /**
     * 类型
     */
    @Column(name = "type")
    private String type;

    /**
     * 父节点
     */
    @Column(name = "parent_id")
    private Integer parentId;

    /**
     * 访问地址
     */
    @Column(name = "path")
    private String path;

    /**
     * 是否权限控制
     */
    @Column(name = "is_controlled")
    private Boolean isControlled;

    /**
     * 图标
     */
    @Column(name = "ico")
    private String ico;

    /**
     * 描述
     */
    @Column(name = "content")
    private String content;

    /**
     * 扩展参数
     */
    @Column(name = "parameter")
    private String parameter;

    /**
     * 排序
     */
    @Column(name = "sort")
    private Integer sort;

    @Column(name = "gmt_create")
    private Date gmtCreate;

    @Column(name = "gmt_modified")
    private Date gmtModified;

    public static final String ID = "id";

    public static final String NAME = "name";

    public static final String CODE = "code";

    public static final String TYPE = "type";

    public static final String PARENT_ID = "parentId";

    public static final String PATH = "path";

    public static final String IS_CONTROLLED = "isControlled";

    public static final String ICO = "ico";

    public static final String CONTENT = "content";

    public static final String PARAMETER = "parameter";

    public static final String SORT = "sort";

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
     * 获取名称
     *
     * @return name - 名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置名称
     *
     * @param name 名称
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 获取标号
     *
     * @return code - 标号
     */
    public String getCode() {
        return code;
    }

    /**
     * 设置标号
     *
     * @param code 标号
     */
    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    /**
     * 获取类型
     *
     * @return type - 类型
     */
    public String getType() {
        return type;
    }

    /**
     * 设置类型
     *
     * @param type 类型
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * 获取父节点
     *
     * @return parent_id - 父节点
     */
    public Integer getParentId() {
        return parentId;
    }

    /**
     * 设置父节点
     *
     * @param parentId 父节点
     */
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    /**
     * 获取访问地址
     *
     * @return path - 访问地址
     */
    public String getPath() {
        return path;
    }

    /**
     * 设置访问地址
     *
     * @param path 访问地址
     */
    public void setPath(String path) {
        this.path = path == null ? null : path.trim();
    }

    /**
     * 获取是否权限控制
     *
     * @return is_controlled - 是否权限控制
     */
    public Boolean getIsControlled() {
        return isControlled;
    }

    /**
     * 设置是否权限控制
     *
     * @param isControlled 是否权限控制
     */
    public void setIsControlled(Boolean isControlled) {
        this.isControlled = isControlled;
    }

    /**
     * 获取图标
     *
     * @return ico - 图标
     */
    public String getIco() {
        return ico;
    }

    /**
     * 设置图标
     *
     * @param ico 图标
     */
    public void setIco(String ico) {
        this.ico = ico == null ? null : ico.trim();
    }

    /**
     * 获取描述
     *
     * @return content - 描述
     */
    public String getContent() {
        return content;
    }

    /**
     * 设置描述
     *
     * @param content 描述
     */
    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    /**
     * 获取扩展参数
     *
     * @return parameter - 扩展参数
     */
    public String getParameter() {
        return parameter;
    }

    /**
     * 设置扩展参数
     *
     * @param parameter 扩展参数
     */
    public void setParameter(String parameter) {
        this.parameter = parameter == null ? null : parameter.trim();
    }

    /**
     * 获取排序
     *
     * @return sort - 排序
     */
    public Integer getSort() {
        return sort;
    }

    /**
     * 设置排序
     *
     * @param sort 排序
     */
    public void setSort(Integer sort) {
        this.sort = sort;
    }

    /**
     * @return gmt_create
     */
    public Date getGmtCreate() {
        return gmtCreate;
    }

    /**
     * @param gmtCreate
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