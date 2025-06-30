class Rectangle:
    
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.width * self.height
    
    def get_perimeter(self):
        return (2 * self.width) + (2 * self.height)
    
    def get_diagonal(self):
        return (self.width**2 + self.height**2)**0.5
    
    def get_picture(self):

        if self.width > 50 or self.height > 50:
            return "Too big for picture."
        
        shape = ''

        for i in range(self.height):
            for j in range(self.width):
                shape += '*'
            shape += f'\n'
        
        return shape
    
    def get_amount_inside(self, shape):

        if not isinstance(shape, (Rectangle, Square)):
            raise TypeError('Input must be a Rectangle or Square object')
        
        return (self.width // shape.width) * (self.height // shape.height)
    def __str__(self):
        return f'{self.__class__.__name__}(width={self.width}, height={self.height})'

class Square(Rectangle):
    
    def __init__(self, side):
        super().__init__(width=side, height=side)
    
    def set_side(self, side):
        self.width = side
        self.height = side

    def set_height(self, height):
        self.set_side(height)

    def set_width(self, width):
        self.set_side(width)

    def __str__(self):
        return f'Square(side={self.width})'

#Test

rec = Rectangle(width = 3, height = 6)
rec2 = Rectangle(width = 1, height = 2)
square = Square(side = 5)
print(rec.get_picture())
print(rec.get_amount_inside(rec2))
print(rec.get_area())
print(rec.get_diagonal())
print(square.get_diagonal())