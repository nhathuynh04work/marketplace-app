# Level 1
electronics = Category.create!(name: "Electronics")
fashion = Category.create!(name: "Fashion")

# Level 2
phones = Category.create!(name: "Mobile Phones", parent: electronics)
laptops = Category.create!(name: "Laptops", parent: electronics)

mens = Category.create!(name: "Men's Fashion", parent: fashion)

# Level 3
Category.create!(name: "iPhone", parent: phones)
Category.create!(name: "Samsung", parent: phones)
Category.create!(name: "T-Shirts", parent: mens)

puts "Created #{Category.count} categories."
