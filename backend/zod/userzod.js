import z from "zod";

export const signupValid = z.object({

        username : z.string().min(5).max(20),
        email : z.email("Invalid email address"),
        password : z.string().min(8)
        
})


export const signinValid = z.object({

        email : z.string().email("Invalid email address"),
        password : z.string().min(8)

})


