package df.ice.boot.web.configuration;

import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.hibernate.validator.HibernateValidator;
import org.springframework.context.annotation.Configuration;

/**
 * Created by df on 2019/1/13.
 */
@Configuration
public class ValidatorConfiguration {

    //@Bean
    public Validator validator() {
        ValidatorFactory validatorFactory = Validation.byProvider(HibernateValidator.class)
            .configure()
            .failFast(false)
            .buildValidatorFactory();
        Validator validator = validatorFactory.getValidator();
        return validator;
    }
}
