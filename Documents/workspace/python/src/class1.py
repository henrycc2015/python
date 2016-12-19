#!/usr/bin/env python
# -*- coding: utf-8 -*-
from Animal import Animal

class Student(Animal):
    
    __slots__ =('name','age')
    NAME = 'jordan'
    def __init__(self,name,age,score):
        self.__name = name
        self.__age = age
        self.__score = score
        self.a,self.b = 0, 1

    def __str__(self):
        return 'I"am %s ,i"am %d ' % (self.__name,self.__age)

    __repr__ = __str__


    def __iter__(self):
        return self

    def __next__(self):
        self.b = self.a + self.b 
        self.a = self.b
        if self.a > 10000:
            raise StopIteration()
        return self.a

    @property
    def score(self):
        return self.__score

    @score.setter
    def score(self,value):
        if not isinstance(value,int):
            raise ValueError('error')
        elif value<0 or value>100:
            raise ValueError('score must between 0 ~ 100!')
        self.__score = value
    def print_score(self):
        print('%s:%s'% (self.__name, self.__score))
    def get_grade(self):
        if self.__score >= 90:
            return 'A'
        elif self.__score >= 60:
            return 'B'
        else:
            return 'C'

    def run(self):
        print('Dog is running')
bart = Student('hery',20,90)
print(bart)

for n in Student('hery',20,90):
    print(n)
# print(bart.score)
# bart.score = 99

# hery = Student('hery2',30,80)
# bart.print_score()

# print(bart.get_grade())
# bart.run()
# print(isinstance(bart,Student))
# print(isinstance(bart,Animal))
# print(hasattr(bart,'print_score'))
# print(hery.NAME)