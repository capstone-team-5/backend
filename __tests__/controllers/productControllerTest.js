const request = require("supertest");
const express = require("express");
const app = express();

// Mock the productQuery before importing the router that uses it
jest.mock('../../queries/productQuery', () => ({
  ...jest.requireActual('../../queries/productQuery'), // Use actual implementations for other methods
  getAllMeat: jest.fn(), // Mock only getAllMeat
}));

// Import the router AFTER mocking. For the love of god remember this! Don't make the same mistake I did... This cost me so much time
const productRouter = require("../../controllers/productController");
app.use(express.json());
app.use("/product", productRouter);

const { getAllMeat } = require('../../queries/productQuery'); // Import the mock to manipulate in tests

describe('Product Endpoints', () => {
  describe('/', () => {
    it('should get all products', async () => {
      const res = await request(app)
        .get('/product')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body.length).toEqual(754);
    });
  });

  describe('product/:id', () => {
    it('should get the first product in the database', async () => {
      // Assuming there's a product with ID of 1
      const res = await request(app)
        .get('/product/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toHaveProperty('product_name', 'Fuji Apples');
      expect(res.body).toHaveProperty('product_brand', 'Fuji Farms');
      expect(res.body).toHaveProperty('product_category', 'Fruits');
      expect(res.body).toHaveProperty('product_description', 'Fresh and Crisp Fuji Apples.');
      expect(res.body).toHaveProperty('product_id', 1);
      expect(res.body).toHaveProperty('product_image', 'https://www.kroger.com/product/images/xlarge/front/0000000004131');
      expect(res.body).toHaveProperty('product_is_caffeine', true);
      expect(res.body).toHaveProperty('product_is_dairy_free', true);
      expect(res.body).toHaveProperty('product_is_egg_free', true);
      expect(res.body).toHaveProperty('product_is_fresh', true);
      expect(res.body).toHaveProperty('product_is_frozen', false);
      expect(res.body).toHaveProperty('product_is_gluten_free', true);
      expect(res.body).toHaveProperty('product_is_halal', false);
      expect(res.body).toHaveProperty('product_is_international', false);
      expect(res.body).toHaveProperty('product_is_keto_friendly', true);
      expect(res.body).toHaveProperty('product_is_kosher', false);
      expect(res.body).toHaveProperty('product_is_low_carb_diet', true);
      expect(res.body).toHaveProperty('product_is_no_added_sugar', true);
      expect(res.body).toHaveProperty('product_is_no_preservatives', true);
      expect(res.body).toHaveProperty('product_is_non_processed', true);
      expect(res.body).toHaveProperty('product_is_nuts_free', true);
      expect(res.body).toHaveProperty('product_is_organic', true);
      expect(res.body).toHaveProperty('product_is_peanut_free', false);
      expect(res.body).toHaveProperty('product_is_seafood', false);
      expect(res.body).toHaveProperty('product_is_stock', true);
      expect(res.body).toHaveProperty('product_is_tree_nuts_free', true);
      expect(res.body).toHaveProperty('product_is_vegan_friendly', true);
      expect(res.body).toHaveProperty('product_is_vegetarian', true);
      expect(res.body).toHaveProperty('product_unit', 'lbs');
      expect(res.body).toHaveProperty('product_weight', '0.50');
    });
  })

  describe("/meat", () => {
    it("should return all meat products on default page", async () => {
      const mockMeatProducts = [{ id: 1, name: "Steak" }, { id: 2, name: "Chicken" }];
      getAllMeat.mockResolvedValue(mockMeatProducts); // Resolve with mock data

      const response = await request(app).get("/product/meat");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockMeatProducts);
      expect(getAllMeat).toHaveBeenCalled(); // Ensure our mock was used
    });

    it("should respond with 500 on server error", async () => {
      getAllMeat.mockRejectedValue(new Error("Simulated database error")); // Force a rejection

      const response = await request(app).get("/product/meat");
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ error: "Server Error" }); // Assuming your error handling responds with this
      expect(getAllMeat).toHaveBeenCalled();
    });

    // Clean up mocks
    afterEach(() => {
      jest.clearAllMocks(); // Clear mock call history after each test
    });
  });

  describe("/grains", () => {
    it("should return all grains on default page", async () => {
      const response = await request(app)
        .get("/product/grains")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });


  describe('/categories', () => {
    it('should get all categories and return status 200', async () => {
      const res = await request(app)
        .get('/product/categories')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body).toEqual(expect.arrayContaining(
        [
          {"product_category": "Bakery"},
          {"product_category": "Baking"},
          {"product_category": "Beverages"},
          {"product_category": "Breakfast"},
          {"product_category": "Canned Goods"},
          {"product_category": "Condiments"},
          {"product_category": "Dairy"},
          {"product_category": "Frozen Foods"},
          {"product_category": "Fruits"},
          {"product_category": "Grains"}
        ]
      ));
    });
  });


});
