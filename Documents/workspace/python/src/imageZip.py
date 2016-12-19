#!/usr/bin/env python
# -*- coding: utf-8 -*-

from PIL import Image
from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
im = Image.open('../pic1.jpeg')
print(im.format, im.size, im.mode)
im.thumbnail((600,800))
im.save('thumb.jpg','JPEG')