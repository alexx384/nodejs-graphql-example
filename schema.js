const graphql = require('graphql');

const mongo = require('./mongodb/mongo');

// ===== Define types =====
const ProductType = new graphql.GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: graphql.GraphQLString },
        title: { type: graphql.GraphQLString },
        qty: { type: graphql.GraphQLInt }
    })
});

// ===== Define queries =====
const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        products: {
            type: new graphql.GraphQLList(ProductType),
            args: {},
            resolve: (parentValue, args) => {
                return mongo.Product.find();
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

// ===== Define mutations =====
const RootMutation = new graphql.GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        createProduct: {
            type: ProductType,
            args: {
                productInput: { type: InputProductType }
            },
            resolve: (value, { productInput }) => {
                return new mongo.Product({
                    title: productInput.title,
                    qty: productInput.qty
                }).save()
                .then(result => {
                    console.log(result)
                    return result;
                });
            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});