

const validation = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body, {
      abortEarly: false, // ارسال جميع الأخطاء  
    });

    if (result.error) {
      return res.status(400).json({
        message: "validation error",
        error: result.error.details.map(item => ({ message: item.message })),
      });
    }

    next();
  };
};

export default validation;
