
from PIL import Image
Standard = "image_"

for i in range(440):  
  filename = Standard + str(i) + ".png"  
  to_filename = Standard + str(i) + ".jpg" 
  #open image in png format
  img_png = Image.open(filename)
    
  img_png.save(to_filename)