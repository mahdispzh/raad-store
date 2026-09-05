
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1),
  image: z.string().min(1),
});

export type CategoryFormValues =
  z.infer<typeof categorySchema>;


  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      name: "",
      image: "",
    },
  });

  <ImageUploaderRHF
    control={form.control}
    name="image"
    mode="single"
    uploadFn={uploadFileToServer}
  />

  const onSubmit = (
    values: CategoryFormValues
  ) => {
    console.log(values);
  };

  import { z } from "zod";

  export const productSchema = z.object({
    name: z.string().min(1),

    images: z
      .array(z.string())
      .min(1),
  });

  export type ProductFormValues =
    z.infer<typeof productSchema>;


    const form = useForm<ProductFormValues>({
      resolver: zodResolver(productSchema),

      defaultValues: {
        name: "",
        images: [],
      },
    });


    <ImageUploaderRHF
      control={form.control}
      name="images"
      mode="multiple"
      maxImages={10}
      uploadFn={uploadFileToServer}
    />

    const onSubmit = (
      values: ProductFormValues
    ) => {
      console.log(values);
    };

    {
      name: "iPhone",

      images: [
        "https://cdn.com/1.jpg",
        "https://cdn.com/2.jpg",
        "https://cdn.com/3.jpg"
      ]
    }

    const uploadFileToServer = async (
      file: File
    ): Promise<string> => {
      console.log(file);

      return URL.createObjectURL(file);
    };
