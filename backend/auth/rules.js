// authorization rules to inforce
const authorization_rules = [  // authorize only if they pass this rules
		{ 
				type: 'post',
				description: "if user is owner",
				passes: (user, resource) => resource.userid.equals(user._id),
		},{
				type: 'post',
				description: "if user is admin",
				passes: (user, resource) => user.admin,
		},{
				type: 'user',
				description: "if user is chagning it own profile",
				passes: (user, resource) => resource._id.equals(user._id),
		},{
				type: 'user',
				description: "if user is admin",
				passes: (user, resource) => user.admin,
		}

]


export { authorization_rules }
