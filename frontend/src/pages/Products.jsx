import React from "react"
import CallToAction from "../components/CallToAction"

export default function Products() {
  return (
    <div className="pb-5 min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold text-center my-2">Products</h1>
      <div className="flex justify-center items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBh-cKrI6ETUryEg-YOzZMFGFL1kNYQvjqNg&s"
          alt="CFC_Logo"
        />
      </div>
      <div className="text-md text-gray-700 dark:text-gray-300 flex flex-col gap-5">
        <p>
          Chilalo Food Complex offers a diverse range of high-quality food
          products that cater to various culinary needs. Their noodles are
          delicious and easy to cook, making them perfect for quick and
          convenient meals. With a variety of pasta shapes and sizes, Chilalo
          ensures that every pasta dish is made from premium ingredients,
          providing an excellent base for numerous recipes.
        </p>
        <p>
          Their macaroni is another standout product, known for its taste and
          versatility in different recipes, whether it's a simple macaroni salad
          or a hearty baked macaroni dish. For snack lovers, Chilalo offers a
          selection of flavorful biscuits that are perfect for enjoying with tea
          or as a quick treat throughout the day.
        </p>
        <p>
          In addition to these, Chilalo Food Complex produces high-quality flour
          that is ideal for all your baking needs, ensuring that your bread,
          cakes, and pastries turn out perfectly every time. Lastly, their wafer
          biscuits are crispy and delightful, available in various flavors,
          making them a favorite among children and adults alike. Each of these
          products reflects Chilalo Food Complex's commitment to quality and
          customer satisfaction.
        </p>
      </div>

      {/* Image Gallery Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <img
          src="https://sooq.et/wp-content/uploads/2023/12/IMG_6713-scaled.jpg"
          alt="Product 1"
          className="w-full h-full object-cover rounded-lg shadow-md"
          style={{ height: "200px", width: "200px" }}
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJEV9U6MEB98cyUXIKcgiGy2Al6NEo9LOJ4Q&s"
          alt="Product 2"
          className="w-full h-full object-cover rounded-lg shadow-md"
          style={{ height: "200px", width: "200px" }}
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAWjPfFG1epESzDLxyrJKLuCFcVdzFiRyuxQ&s"
          alt="Product 3"
          className="w-full h-full object-cover rounded-lg shadow-md"
          style={{ height: "200px", width: "200px" }}
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0dWFFfb-0lE5QlRs3xHfVrkvPrwzj9wdB7w&s"
          alt="Product 4"
          className="w-full h-full object-cover rounded-lg shadow-md"
          style={{ height: "200px", width: "200px" }}
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMXFQZcOp4Kq3-ukKuyKVkrSJHPFXWUmjyBA&s"
          alt="Product 5"
          className="w-full h-full object-cover rounded-lg shadow-md"
          style={{ height: "200px", width: "200px" }}
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZKJFEHPHjl9A5EntR2H0VhlCfAMvTZ9NxQA&s"
          alt="Product 6"
          className="w-full h-full object-cover rounded-lg shadow-md"
          style={{ height: "200px", width: "200px" }}
        />
      </div>

      <CallToAction />
    </div>
  )
}
