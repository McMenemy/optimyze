# Schema Information

## optimizations
column name               | data type | details
--------------------------|-----------|-----------------------
id                        | integer   | not null, primary key
title                     | string    | not null
description               | text      |
investment_time           | integer   | not null
time_saved_per_occurrence | integer   | not null
frequency                 | integer   | not null
public                    | boolean   | not null
user_id                   | integer   | not null, foreign key, indexed

* investment_time and time_saved_per_occurrence are stored as milliseconds
* frequency is stored as occurrences per year

## categories
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null, indexed
optimization_id | integer   | not null, foreign key, indexed

## categories_optimizations
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key, indexed
optimization_id | integer   | not null, foreign key, indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
