const request = require('supertest');
const express = require('express');
const server = require('../api/server');
const db = require("../database/dbConfig");
const Users = require("../users/users-model");

describe('making sure users are authenticated', () => {
    const new_user1 = { username: "Test1", password: "pass123"};
    const new_user2 = { username: "Test2", password: "pass456"};

    beforeEach(async () => {
        await db('users').truncate();
      });
      
      
    describe("User can register", () => {
        it("Should return userName resgistered with", async () => {
            return await request(server).post('/api/auth/register').send(new_user1).then(res => {test = expect(res.body.created_user.username).toBe(new_user1.username)});
        });

        it("should return status 201", async () => {
            return await request(server).post('/api/auth/register').send(new_user1).then(res => expect(res.status).toBe(201));
        });
    });

    describe("Login", () => {
        it("should give back the user name", async () => {
            await request(server).post('/api/auth/register').send(new_user2);
            return await request(server).post('/api/auth/login').send(new_user2).then(res => expect(res.body.username).toBe(new_user2.username));
        });

        it("return status 200", async () => {
            await request(server).post('/api/auth/register').send(new_user2);
            return await request(server).post('/api/auth/login').send(new_user2).then(res => expect(res.status).toBe(200));
        });
    });
})