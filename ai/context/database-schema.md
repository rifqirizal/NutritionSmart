# Database Schema

## users

| Column        | Type      |
| ------------- | --------- |
| id            | uuid      |
| name          | varchar   |
| email         | varchar   |
| password_hash | text      |
| created_at    | timestamp |
| updated_at    | timestamp |

---

## profiles

| Column         | Type      |
| -------------- | --------- |
| id             | uuid      |
| user_id        | uuid      |
| birth_date     | date      |
| gender         | varchar   |
| height_cm      | integer   |
| current_weight | decimal   |
| target_weight  | decimal   |
| goal           | varchar   |
| created_at     | timestamp |
| updated_at     | timestamp |

---

## meals

| Column     | Type      |
| ---------- | --------- |
| id         | uuid      |
| user_id    | uuid      |
| image_url  | text      |
| meal_name  | varchar   |
| created_at | timestamp |

---

## meal_nutritions

| Column           | Type    |
| ---------------- | ------- |
| id               | uuid    |
| meal_id          | uuid    |
| calories         | decimal |
| protein          | decimal |
| carbs            | decimal |
| fat              | decimal |
| confidence_score | decimal |

---

## ai_recommendations

| Column              | Type      |
| ------------------- | --------- |
| id                  | uuid      |
| user_id             | uuid      |
| recommendation_text | text      |
| generated_at        | timestamp |

---

## daily_summaries

| Column         | Type    |
| -------------- | ------- |
| id             | uuid    |
| user_id        | uuid    |
| date           | date    |
| total_calories | decimal |
| total_protein  | decimal |
| total_carbs    | decimal |
| total_fat      | decimal |

---

## Relationships

users 1:N meals

users 1:1 profiles

users 1:N ai_recommendations

meals 1:1 meal_nutritions

users 1:N daily_summaries
