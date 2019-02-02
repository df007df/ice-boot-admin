package df.ice.boot.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Pandora Boot应用的入口类
 * <p>
 * 其中导入sentinel-tracer.xml是加sentinel限流，详情见
 * http://gitlab.alibaba-inc.com/middleware-container/pandora-boot/wikis/spring-boot-sentinel
 * <p>
 * 详情见http://gitlab.alibaba-inc.com/middleware-container/pandora-boot/wikis/spring-boot-diamond
 *
 * @author chengxu
 */
@SpringBootApplication(
    scanBasePackages = {"df.ice.boot.web", "df.ice.boot.web.configuration"})
public class AdminApplication {

    public static void main(String[] args) {

        SpringApplication.run(AdminApplication.class, args);
    }
}
