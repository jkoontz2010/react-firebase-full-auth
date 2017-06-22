export const isRequired = (value) => value.length === 0 ? "Required" : undefined;
export const isEmail = (value) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? undefined : "Invalid email"; 
export const validPassword = (value) => value.length < 6 ? "Password must be at least 6 characters" : undefined;
