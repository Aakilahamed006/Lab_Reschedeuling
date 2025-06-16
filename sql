SELECT ml.*
FROM medical_letter ml
JOIN practical_details pd ON ml.Practical_Id = pd.Practical_Id
JOIN subject_details s ON pd.Subject_Id = s.Subject_Id
WHERE s.Subject_Coodinator_Id = 5
LIMIT 0, 25;
