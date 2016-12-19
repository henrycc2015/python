#!/usr/bin/env python3
# -*- coding: utf-8 -*-

'a test module'

__author__ = 'hery yao'

import sys

def test():
    args = 'hery'
    print(len(args))
    if len(args) == 1:
        print('hello world')
    elif len(args)==2:
        print('hello , %s' % args[1])
    else:
        print('too many arguments')

test()