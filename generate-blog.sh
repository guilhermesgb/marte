#!/usr/bin/env bash
rm -rf blog/generated
cd blog
hugo
cd ..
mv blog/generated/index.html blog.html
mv blog/generated/posts/* posts
