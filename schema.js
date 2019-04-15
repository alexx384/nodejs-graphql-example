const graphql = require('graphql');

const mongo = require('./mongodb/mongo');
const postgres = require('./postgresql/postgres');

// ===== Define types =====
const StudentType = new graphql.GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        _id:        { type: graphql.GraphQLString },
        name:       { type: graphql.GraphQLString },
        surname:    { type: graphql.GraphQLString },
        patronymic: { type: graphql.GraphQLString },
        group:      { type: graphql.GraphQLString },
        course:     { type: graphql.GraphQLInt },
        study:      { type: graphql.GraphQLBoolean },
        remarks:    {
            type: graphql.GraphQLList(RemarkType),
            resolve: (parentValue, args) => {
                return mongo.Remark.find();
            }
        }
    })
});

const RemarkType = new graphql.GraphQLObjectType({
    name: 'Remark',
    fields: () => ({
        _id:             { type: graphql.GraphQLString },
        name:            { type: graphql.GraphQLString },
        grade:           { type: graphql.GraphQLInt },
        last_grade_date: { type: graphql.GraphQLString }
    })
});

// ===== Define queries =====
const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        students: {
            type: new graphql.GraphQLList(StudentType),
            args: {},
            resolve: (parentValue, args) => {
                return postgres.Student.findAll();
            }
        },
        remarks: {
            type: new graphql.GraphQLList(RemarkType),
            args: {},
            resolve: (parentValue, args) => {
                return mongo.Remark.find();
            }
        }
    }
});

// ===== Define input types =====
const InputStudentType = new graphql.GraphQLInputObjectType({
    name: 'StudentInput',
    fields: () => ({
        name: { type: graphql.GraphQLString },
        surname: { type: graphql.GraphQLString },
        patronymic: { type: graphql.GraphQLString },
        group: { type: graphql.GraphQLString },
        course: { type: graphql.GraphQLInt },
        study: { type: graphql.GraphQLBoolean },
        remarks: { type: new graphql.GraphQLList(InputRemarkType) }
    })
});

const InputRemarkType = new graphql.GraphQLInputObjectType({
    name: 'RemarkInput',
    fields: () => ({
        name:            { type: graphql.GraphQLString },
        grade:           { type: graphql.GraphQLInt },
        last_grade_date: { type: graphql.GraphQLString }
    })
});

// ===== Define mutations =====
const RootMutation = new graphql.GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        createStudent: {
            type: StudentType,
            args: {
                student: { type: InputStudentType }
            },
            resolve: async (value, { student: studentInput }) => {
                // Check if remarks exist
                var remarkIds = [];
                for (let remarkInput of studentInput.remarks) {
                    remark = await mongo.Remark.findOne(remarkInput);

                    if (remark == null) {
                        const remark = await new mongo.Remark(remarkInput).save();
                        var remarkId = remark.id;
                    } else {
                        var remarkId = remark.id;
                    }

                    remarkIds.push(remarkId.id);
                }

                // Check if student exist
                const student = await postgres.Student.findOne({ where: {
                    name: studentInput.name,
                    surname: studentInput.surname,
                    patronymic: studentInput.patronymic,
                    group: studentInput.group,
                    course: studentInput.course,
                    study: studentInput.study
                } });

                // Create student or update existing
                if (student == null) {
                    return postgres.Student.create({
                        name: studentInput.name,
                        surname: studentInput.surname,
                        patronymic: studentInput.patronymic,
                        group: studentInput.group,
                        course: studentInput.course,
                        study: studentInput.study,
                        remarks: remarkIds
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });
                } else {
                    for (let remarkId of remarkIds) {
                        if (student.remarks.includes(remarkId) === false) {
                            student.remarks.push(remarkId);
                        }
                    }
                    return student.save();
                }
            }
        },
        createRemark: {
            type: RemarkType,
            args: {
                remark: { type: InputRemarkType }
            },
            resolve: async (value, { remark: remarkInput }) => {
                remark = await mongo.Remark.findOne(remarkInput);

                if (remark == null) {
                    return new mongo.Remark(remarkInput).save()
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });
                } else {
                    return remark;
                }
            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});