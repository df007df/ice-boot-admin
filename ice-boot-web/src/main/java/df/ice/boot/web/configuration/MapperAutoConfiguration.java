package df.ice.boot.web.configuration;

import org.springframework.context.annotation.Configuration;

/**
 * Created by df on 2018/11/13.
 */
@Configuration
@tk.mybatis.spring.annotation.MapperScan(basePackages = "df.ice.boot.web.dao")
public class MapperAutoConfiguration {

}
