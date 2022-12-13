process.env.NODE_ENV = 'test';

const app = require('../app')
let token = 'some_authorization_token'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const Post = require('../models/Post')


chai.use(chaiHttp)

// write tests for users

describe('Authenticate', () => {
    it('it should not POST a user without email field', (done) => {
        let user = {
            password: "123456"
        }
        chai.request(app)
            .post('/api/authenticate')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.eql('User does not exist')
                done()
            })
    })

    it('it should not POST a user without password field', (done) => {
        let user = {
            email: "abcd@g.com"
        }
        chai.request(app)
            .post('/api/authenticate') 
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.eql('User does not exist')
                done()
            })

        })

    it('it should not POST a user with wrong password', (done) => {
        let user = {
            email: "abcd@gmail.com",
            password: "123456"
        }
        chai.request(app)
            .post('/api/authenticate')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.eql('Invalid password')
                done()
            })

        })

    it('it should POST a user ', (done) => {
        let user = {
            email: "abcd@gmail.com",
            password: "12345678"
        }
        chai.request(app)
            .post('/api/authenticate')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('jwtToken')
                token = res.body.jwtToken
                // console.log(token)
                done()
            })

        })
})

// write tests for posts

describe('Posts', () => {
    it('it should reject unauthenticated requests', (done) => {
        chai.request(app)
            .get('/api/posts')
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.eql('Unauthorized')
                done()
            })
    })

    it('it should POST a new post', (done) => {
        let post = {
            title: "Post 1",
            description: "Post 1 description"
        }
        chai.request(app)
            .post('/api/posts')
            .send(post)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('title')
                res.body.should.have.property('description')
                res.body.title.should.eql(post.title)
                res.body.description.should.eql(post.description)
                done()
            })
    })

    it('it should not POST a new post without title field', (done) => {
        let post = {
            description: "Post 1 description"
        }
        chai.request(app)
            .post('/api/posts')
            .send(post)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.eql('Post validation failed: title: Path `title` is required.')
                done()
            })
    })

    it('it should GET a post by the given id', (done) => {
        let post = new Post({
            title: "Post 2",
            description: "Post 2 description"
        })
        post.save((err, post) => {
            chai.request(app)
                .get('/api/posts/' + post.id)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title')
                    res.body.should.have.property('description')
                    res.body.should.have.property('_id').eql(post.id)
                    done()
                })
        })
    })

    it('it should not GET a post by the given id', (done) => {
        chai.request(app)
            .get('/api/posts/123')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.eql('Invalid post id')
                done()
            })
    })


    it('it should not DELETE a post by the given id', (done) => {
        chai.request(app)
            .delete('/api/posts/123')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.eql('Invalid post id')
                done()
            })
    })

})

// write tests to get user profile

describe('User', () => {
    it('it should get user profile', (done) => {
        chai.request(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('username')
                res.body.should.have.property('followerCount')
                res.body.should.have.property('followingCount')
                done()
            })
    })
})

// write tests to get all posts of a user

describe('AllPosts', () => {
    it('it should get all posts of a user', (done) => {
        chai.request(app)
            .get('/api/all_posts')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.forEach(element => {
                    element.should.have.property('_id')
                    element.should.have.property('title')
                    element.should.have.property('description')
                    element.should.have.property('createdAt')
                    element.should.have.property('comments')
                    element.should.have.property('likes')
                });
                done()
            })
    })
})