const request = require("supertest")
const app = require("../index")
describe("All Test Cases", () => {
    it("index page test", async () => {
        const res = await request(app).get("/")
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("message")
        expect(res.body.message).toEqual("Hello from LinkShortner App.")
    })

    it("link generate api test", async () => {
        const res = await request(app)
            .post('/api/generate')
            .send({
                link: "https://www.google.com"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("link")
        if (res.body.link) {
            expect(res.body.link).toContain("http://localhost:8080")
            let split = res.body.link.split("/")
            let code = split[split.length - 1]
            expect(code).toHaveLength(5)
        }
    })

    it("stats api test", async () => {
        const res = await request(app).get('/api/stats')
        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBe(true)
        if (Array.isArray(res.body)) {
            res.body.forEach((link, index) => {
                expect(link).toHaveProperty("fullLink")
                expect(link).toHaveProperty("shortLink")
                expect(link).toHaveProperty("hits")
                expect(link).toHaveProperty("languages")
                if (link.shortLink) {
                    expect(link.shortLink).toContain("http://localhost:8080")
                    let split = link.shortLink.split("/")
                    let code = split[split.length - 1]
                    expect(code).toHaveLength(5)
                }
            })
        }
    })
})

afterAll(() => console.log("sasd"))