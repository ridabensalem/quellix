import * as z from 'zod';

const formSchema = z.object({
    prompt: z.string().min(1 ,{
        message: 'Video prompt is required'
    }),
})
export default formSchema;