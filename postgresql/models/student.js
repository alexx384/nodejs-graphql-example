const Sequelize = require('sequelize');

const Student = {
    _id:        { type: Sequelize.STRING                  },
    name:       { type: Sequelize.STRING                  },
    surname:    { type: Sequelize.STRING                  },
    patronymic: { type: Sequelize.STRING                  },
    group:      { type: Sequelize.STRING                  },
    course:     { type: Sequelize.INTEGER                 },
    study:      { type: Sequelize.BOOLEAN                 },
    remarks:    { type: Sequelize.ARRAY(Sequelize.STRING) }
};

module.exports = Student;