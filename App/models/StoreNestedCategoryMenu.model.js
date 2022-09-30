import mongoose from "mongoose";

const StoreNestedCategoryMenuSchema = mongoose.Schema(
  {
    menu: [
      {
        name: {
          type: String,
          trim: true,
          require: true,
        },
        children: [
          {
            name: {
              type: String,
              trim: true,
              require: true,
            },
            children: [
              {
                name: {
                  type: String,
                  trim: true,
                  require: true,
                },
                children: [
                  {
                    name: {
                      type: String,
                      trim: true,
                      require: true,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const StoreNestedCategoryMenu = mongoose.model(
  "StoreNestedCategoryMenu",
  StoreNestedCategoryMenuSchema
);
