
// despues tratar cambiando a rocket ID  para experimentar.
const { GraphQLObjectType, GraphQLInt , GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema, GraphQLID} = require('graphql');
const axios = require('axios');

// Tipo de lanzamiento
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLString },
        rocket: { type: RocketType }
    })
});

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLID },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString },
        wikipedia: { type: GraphQLString },
        description: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    // Porque aquí no es una función como en los otros tipos?
    //posiblemente sea por que estamos obteniendo la info de LAunchType
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios
                    .get('https://api.spacexdata.com/v3/launches')
                    .then(res => res.data);
            }
        },

        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios 
                    .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data);
            }
        },

        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args){
                return axios 
                    .get('https://api.spacexdata.com/v3/rockets')
                    .then(res => res.data);
            }
            //list
        },

        rocket: {
            type: RocketType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
                axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                .then(res => res.data)
            }

        }
    }
});



module.exports = new GraphQLSchema({ query: RootQuery });