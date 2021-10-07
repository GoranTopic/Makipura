const haveSameData = function (obj1, obj2) {
		/* if for every property in obj1, 
		 * obj2 has the same value, return true
		 * else return false */
		return Object.keys(obj1).every(
				key => obj2.hasOwnProperty(key)
				&& obj2[key] === obj1[key]);
		return false;
}

export { haveSameData };
