package df.ice.boot.web.dao;

import df.ice.boot.core.dao.BaseDao;
import java.util.Date;
import javax.persistence.*;

@Table(name = "menu_resource")
public class MenuResource extends BaseDao {
    @Id
    @Column(name = "id")
    private Integer id;

    /**
     * 名称
     */
    @Column(name = "name")
    private String name;

    /**
     * 菜单ID
     */
    @Column(name = "menu_id")
    private Integer menuId;

    /**
     * 资源类型
     */
    @Column(name = "type")
    private String type;

    /**
     * 服务端访问地址
     */
    @Column(name = "api_path")
    private String apiPath;

    /**
     * 前端按钮标记
     */
    @Column(name = "api_button_code")
    private String apiButtonCode;

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

    public static final String MENU_ID = "menuId";

    public static final String TYPE = "type";

    public static final String API_PATH = "apiPath";

    public static final String API_BUTTON_CODE = "apiButtonCode";

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
     * 获取菜单ID
     *
     * @return menu_id - 菜单ID
     */
    public Integer getMenuId() {
        return menuId;
    }

    /**
     * 设置菜单ID
     *
     * @param menuId 菜单ID
     */
    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }

    /**
     * 获取资源类型
     *
     * @return type - 资源类型
     */
    public String getType() {
        return type;
    }

    /**
     * 设置资源类型
     *
     * @param type 资源类型
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * 获取服务端访问地址
     *
     * @return api_path - 服务端访问地址
     */
    public String getApiPath() {
        return apiPath;
    }

    /**
     * 设置服务端访问地址
     *
     * @param apiPath 服务端访问地址
     */
    public void setApiPath(String apiPath) {
        this.apiPath = apiPath == null ? null : apiPath.trim();
    }

    /**
     * 获取前端按钮标记
     *
     * @return api_button_code - 前端按钮标记
     */
    public String getApiButtonCode() {
        return apiButtonCode;
    }

    /**
     * 设置前端按钮标记
     *
     * @param apiButtonCode 前端按钮标记
     */
    public void setApiButtonCode(String apiButtonCode) {
        this.apiButtonCode = apiButtonCode == null ? null : apiButtonCode.trim();
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