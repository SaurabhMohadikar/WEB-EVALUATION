const Sequelize = require('sequelize');
const sequelize = new Sequelize('makedatabase', 'root', 'root', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    storage: './database.db'
});
const Course = sequelize.define("courses", {
    courseid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    courseName:
    {
        type: Sequelize.STRING(40),
        allowNull: false

    }
})

const Student = sequelize.define("students", {
    studentid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    studentName:
    {
        type: Sequelize.STRING(40),
        allowNull: false

    }

})
const Subject = sequelize.define("subjects", {
    subjectid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subjectName:
    {
        type: Sequelize.STRING(40),
        allowNull: false

    }
})
const Teacher = sequelize.define("teachers", {
    teacherid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    teacherName:
    {
        type: Sequelize.STRING(40),
        allowNull: false

    },
    //fk not set  
})
const Batch = sequelize.define("batches", {
    batchid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    batchName:
    {
        type: Sequelize.STRING(40),
        allowNull: false

    }
    //fk not set
})

const Lecture = sequelize.define("lectures", {
    lectureid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lectureName:
    {
        type: Sequelize.STRING(40),
        allowNull: false

    }
    //fk not set
})


const batchStudent = sequelize.define("batch-students", {
    batchStudentid: {
        primaryKey: true,
        type: Sequelize.INTEGER
        , autoIncrement: true

    }

})
Course.hasMany(Subject)
Course.hasMany(Batch)
Subject.hasMany(Teacher)
Batch.belongsToMany(Student, { through: batchStudent })
Student.belongsToMany(Batch, { through: batchStudent })
Subject.hasOne(Lecture)
Batch.hasMany(Lecture)
Teacher.hasMany(Lecture)

sequelize
    .sync()
    .then(() => {
        console.log('Data Created.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
module.exports = {
    sequelize, Course, Teacher, Batch, Student, Subject, Lecture, batchStudent
}