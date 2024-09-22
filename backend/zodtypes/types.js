const z = require('zod');

const usernameschema = z.string().email();
const passwordschema = z.string().min(3);
const firstnameschema = z.string().max(30); 
const lastnameschema= z.string().max(30);

const signinschema = z.object({
  username: z.string(),
  password: z.string(),
}).strict()


module.exports = ({
  usernameschema,
  passwordschema,
  firstnameschema,
  lastnameschema,
  signinschema
})