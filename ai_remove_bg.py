import rembg
from PIL import Image
import sys

def main():
    input_path = 'public/logo.png'
    output_path = 'public/logo.png'
    
    with open(input_path, 'rb') as i:
        input_image = i.read()
        
    output_image = rembg.remove(input_image)
    
    with open(output_path, 'wb') as o:
        o.write(output_image)

if __name__ == '__main__':
    main()
