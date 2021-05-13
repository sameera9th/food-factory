import request from "supertest";
import { app } from "../../app";

it("[create ingredient] has a route handler listening to /api/food/ingredients for POST request", async () => {
  const response = await request(app).post("/api/food/ingredients").send({});
  expect(response.status).not.toEqual(404);
});

it("[create ingredient] fails when request body is empty", async () => {
  await request(app).post("/api/food/ingredients").send({}).expect(400);
});

it("[create ingredient] fails when request contain an empty ingredient name", async () => {
  await request(app)
    .post("/api/food/ingredients")
    .send({ name: "" })
    .expect(400);
});

it("[create ingredient] creates an ingredient for valid ingredient name", async () => {
    await request(app)
      .post("/api/food/ingredients")
      .send({ name: "ingredient A" })
      .expect(200);
});

it("[retrieve ingredients] has a route handler listening to /api/food/ingredients for GET request", async () => {
    const response = await request(app).get("/api/food/ingredients").send({});
    expect(response.status).not.toEqual(404);
});

it("[update ingredients order] has a route handler listening to /api/food/ingredients for PUT request", async () => {
    const response = await request(app).put("/api/food/ingredients").send({});
    expect(response.status).not.toEqual(404);
});

it("[update ingredients order] fails when request body is empty", async () => {
    await request(app).put("/api/food/ingredients").send({}).expect(400);
});

it("[update ingredients order] fails when request does not contain an ingredient array", async () => {
    await request(app)
      .put("/api/food/ingredients")
      .send({ ingredients: {} })
      .expect(400);
});

it("[update ingredients order] update an ingredient for valid ingredient Id", async () => {
    await request(app)
      .put("/api/food/ingredients")
      .send({ ingredients: [{ _id: 12121 }] })
      .expect(200);
});