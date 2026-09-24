export const tabletProducts = [
  ['Albendazole 400mg tablet', 'Tablet', 'General'],
  ['Atorvastatin 20mg', 'Tablet', 'General'],
  ['Atorvastatin 40mg', 'Tablet', 'General'],
  ['Azithromycin 250mg tablet', 'Tablet', 'General'],
  ['Azithromycin 500mg tablet', 'Tablet', 'General'],
  ['Chlorpromazine HCl 100mg tablet', 'Tablet', 'General'],
  ['Chlorpromazine HCl 25mg tablet', 'Tablet', 'General'],
  ['Ciprofloxacin 500mg tablet', 'Tablet', 'General'],
  ['Clarithromycin 500mg tablet', 'Tablet', 'General'],
  ['Enalapril 10mg scored tablet', 'Tablet', 'General'],
  ['Enalapril maleate 5mg tablet', 'Tablet', 'General'],
  ['Esomeprazole 20mg enteric coated tablet', 'Tablet', 'General'],
  ['Frusemide 40mg tablet', 'Tablet', 'General'],
  ['Glibenclamide 5mg tablet', 'Tablet', 'General'],
  ['Hydrochlorothiazide 25mg tablet', 'Tablet', 'General'],
  ['Ibuprofen 400mg tablet', 'Tablet', 'General'],
  ['Metformin 500mg tablet', 'Tablet', 'General'],
  ['Metoprolol 25mg tablet', 'Tablet', 'General'],
  ['Multivitamin with minerals tablets', 'Tablet', 'General'],
  ['Nifedipine 20mg tablet', 'Tablet', 'General'],
  ['Paracetamol 500mg tablet', 'Tablet', 'General'],
  ['Paracetamol + chlorpheniramine + pseudoephedrine tablet', 'Tablet', 'General'],
  ['Phenobarbitone 100mg tablet', 'Tablet', 'General'],
  ['Phenobarbitone 30mg tablet', 'Tablet', 'General'],
  ['Phenytoin sodium 50mg tablet', 'Tablet', 'General'],
  ['Prednisolone 5mg tablet', 'Tablet', 'General'],
  ['Propylthiouracil 100mg tablet', 'Tablet', 'General'],
  ['Simvastatin 20mg tablet', 'Tablet', 'General'],
  ['Simvastatin 40mg tablet', 'Tablet', 'General'],
  ['Sodium valproate 200mg tablet', 'Tablet', 'General'],
  ['Spironolactone 25mg tablet', 'Tablet', 'General'],
  ['Sulphamethoxazole + trimethoprim (400mg + 80mg) tablet', 'Tablet', 'General'],
  ['Sulphamethoxazole + trimethoprim (800mg + 160mg) tablet', 'Tablet', 'General'],
  ['Vitamin B1 + B6 + B12 tablet', 'Tablet', 'General'],
  ['Zinc Acetate 20mg (Scored) Dispersible Tablet', 'Tablet', 'General'],
]

export const oralLiquidProducts = [
  ['Almunium hydroxide 225mg + Magnesium hydroxide 200mg + Simeticone 25mg in 5 ml suspension', 'Suspension', 'General', 1],
  ['Azithromycin 200mg/5ml suspension', 'Suspension', 'General', 2],
  ['Mebendazole 100mg/5ml oral suspension', 'Suspension', 'General', 3],
  ['Metronidazole 125mg/5ml oral suspension', 'Suspension', 'General', 4],
  ['Castor oil \u2013 Liquid', 'Syrup', 'General', 6],
  ['Dextromethorphan 15mg/5ml Syrup', 'Syrup', 'General', 7],
  ['Diphenhydramine HCL 12.5mg/1/ml elixire', 'Syrup', 'General', 8],
  ['Ferric Ammonium Citrate 160mg, Folic Acid 0.5mg, Vitamin B-12 7.5mcg, Cupric Sulphate 30mcg & Manganese Sulphate 30mcg & Minerals/5ml Heamup Like (Pregnancy Combination Syrup)', 'Syrup', 'General', 9],
  ['Guafensine 100mg/5ml syrup', 'Syrup', 'General', 10],
  ['Ibuprofen 100mg/5m syrup', 'Syrup', 'General', 11],
  ['Multivitamin Syrup', 'Syrup', 'General', 12],
  ['Paracetamol 125mg/5ml syrup', 'Syrup', 'General', 13],
  ['Paracetamol + Chlorpheniramine + Pseudoephedrine Syrup', 'Syrup', 'General', 14],
]

export const capsuleProducts = [
  ['Ferrous salt 150mg+Folic acid 0.5mg capsule', 'Capsule', 'General'],
  ['Tramadol HCL 50 mg capsules', 'Capsule', 'General'],
]

export const sachetProducts = [
  ['O.R.S 27.9 gm', 'Sachet', 'General'],
]

export const categoryProducts = {
  tablets: tabletProducts,
  capsule: capsuleProducts,
  'oral-liquid': oralLiquidProducts,
  sachet: sachetProducts,
}

export const categoryFallback = {
  tablets: {
    title: 'Tablets',
    intro: 'Solid oral dosage products across multiple therapeutic areas.',
  },
  capsule: {
    title: 'Capsule',
    intro: 'Capsule-form products within the company\u2019s planned finished dosage portfolio.',
  },
  sachet: {
    title: 'sachet',
    intro: 'Unit-dose sachet formats for suitable pharmaceutical preparations.',
  },
  'oral-liquid': {
    title: 'Oral Liquid',
    intro: 'Liquid preparations designed for convenient oral administration.',
  },
}
