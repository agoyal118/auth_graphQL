const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString
} = graphql;

const UserType = require('./types/user_type.js');
const AuthService = require('../services/auth');

//request represents the request object
//coming in from express
//
//calling req.logout removes the
//user property from req (req.user)
const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		signup: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parentValue, { email, password} , req) {
				return AuthService.signup({ email, password, req });
			}
		},
		logout: {
			type: UserType,
			resolve(parentValue, args, req) {
				const { user } = req;
				req.logout();
				return user;
			}
		},
		login: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parentValue, { email, password }, req) {
				return AuthService.login({ email, password, req });
			}
		}
	}
});

module.exports = mutation;