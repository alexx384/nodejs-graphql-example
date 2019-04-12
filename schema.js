const graphql = require('graphql');

const mongo = require('./mongodb/mongo');
const postgres = require('./postgresql/postgres');

// ===== Define types =====
const ProductType = new graphql.GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: graphql.GraphQLString },
        title: { type: graphql.GraphQLString },
        qty: { type: graphql.GraphQLInt },
        remarks: {
            type: graphql.GraphQLList(RemarkType),
            resolve: (parentValue, args) => {
                return postgres.RemarkModel.findAll();
            }
        }
    })
});

const RemarkType = new graphql.GraphQLObjectType({
    name: 'Remark',
    fields: () => ({
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        group: { type: graphql.GraphQLString },
        date: { type: graphql.GraphQLString }
    })
});

// ===== Define queries =====
const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        products: {
            type: new graphql.GraphQLList(ProductType),
            args: {},
            resolve: (parentValue, args) => {
                return mongo.Product.find();
            }
        },
        remarks: {
            type: new graphql.GraphQLList(RemarkType),
            args: {},
            resolve: (parentValue, args) => {
                return postgres.RemarkModel.findAll();
            }
        }
    }
});

// ===== Define input types =====
const InputProductType = new graphql.GraphQLInputObjectType({
    name: 'ProductInput',
    fields: () => ({
        title: { type: graphql.GraphQLString },
        qty: { type: graphql.GraphQLInt }
    })
});

const InputRemarkType = new graphql.GraphQLInputObjectType({
    name: 'RemarkInput',
    fields: () => ({
        name: { type: graphql.GraphQLString },
        group: { type: graphql.GraphQLString },
        date: { type: graphql.GraphQLString }
    })
});

// ===== Define mutations =====
const RootMutation = new graphql.GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        createProduct: {
            type: ProductType,
            args: {
                product: { type: InputProductType }
            },
            resolve: (value, { product }) => {
                return new mongo.Product({
                    title: product.title,
                    qty: product.qty
                }).save()
                .catch(err => {
                    console.log(err);
                    throw err;
                });
            }
        },
        createRemark: {
            type: RemarkType,
            args: {
                remark: { type: InputRemarkType }
            },
            resolve: (value, { remark }) => {
                return postgres.RemarkModel.create({
                    name: remark.name,
                    group: remark.group,
                    date: remark.date
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});