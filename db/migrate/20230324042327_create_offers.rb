class CreateOffers < ActiveRecord::Migration[7.0]
  def change
    create_table :offers do |t|
      t.string :description
      t.integer :target_age_min
      t.integer :target_age_max
      t.string :target_gender

      t.timestamps
    end
  end
end
