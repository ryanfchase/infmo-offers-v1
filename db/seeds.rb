# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'faker'

UserOffer.destroy_all
Offer.destroy_all

# People who attend college / young adults
['male', 'female', 'any'].each do |gender|
    rand(1..3).times do
        Offer.create!(
            description: Faker::Marketing.buzzwords,
            target_age_min: 18,
            target_age_max: 25,
            target_gender: gender
        )
    end
end

# People who are in their late 20s
rand(1..3).times do
    Offer.create!(
        description: Faker::Marketing.buzzwords,
        target_age_min: 25,
        target_age_max: 29,
        target_gender: 'any'
    )
end

# Women who are in their 30s
rand(1..3).times do
    Offer.create!(
        description: Faker::Marketing.buzzwords,
        target_age_min: 30,
        target_age_max: 39,
        target_gender: 'female'
    )
end

# Generic
5.times do
    Offer.create!(
        description: Faker::Marketing.buzzwords,
        target_age_min: 18,
        target_age_max: 65,
        target_gender: 'any'
    )
end

# Men of all ages
2.times do
    Offer.create!(
        description: Faker::Marketing.buzzwords,
        target_age_min: 18,
        target_age_max: 65,
        target_gender: 'male'
    )
end