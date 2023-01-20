import { body, query, param } from "express-validator";

class RouteValidator {
  checkCreateRoute() {
    return [
      body("route").notEmpty().withMessage("The route should not be empty"),
    ];
  }

  checkCreateCustomer() {
    return [
      body("name")
        .notEmpty()
        .withMessage("The customer name should not be empty"),
    ];
  }

  checkReadRoute() {
    return [
      query("limit")
        .notEmpty()
        .withMessage("the query limit should not be empty")
        .isInt({ min: 1, max: 10 })
        .withMessage("the limit value should be a number between 1-10"),
    ];
  }

  checkIdParam() {
    return [
      param("id")
        .notEmpty()
        .withMessage("the value should not be empty")
        .isUUID(4)
        .withMessage("the value should be uuid v4"),
    ];
  }
}

export default new RouteValidator();
