export interface DictionaryItem {
  id: string;
  label: string;
  description: string;
  svgPath: string;
  category: 'alphabet' | 'numbers' | 'greetings' | 'common' | 'family' | 'questions' | 'feelings' | 'time' | 'emergency';
}

export const dictionaryData: DictionaryItem[] = [
  // Alphabet
  { id: 'a', label: 'A', category: 'alphabet', description: 'Le pouce est dressé sur le côté du poing fermé.', svgPath: 'M30 60 Q30 75 45 75 L55 75 Q70 75 70 60 L70 40 Q70 25 55 25 L45 25 Q30 25 30 40 Z' },
  { id: 'b', label: 'B', category: 'alphabet', description: 'La main est ouverte, les quatre doigts sont serrés et dressés.', svgPath: 'M35 80 L35 25 Q35 15 45 15 Q55 15 55 25 L55 80' },
  { id: 'c', label: 'C', category: 'alphabet', description: 'La main forme la lettre C.', svgPath: 'M65 30 Q50 20 35 30 Q20 40 20 50 Q20 60 35 70 Q50 80 65 70' },
  { id: 'd', label: 'D', category: 'alphabet', description: 'L\'index est dressé, le pouce et les autres doigts forment un cercle.', svgPath: 'M40 80 L40 20 M40 50 Q60 50 60 65 Q60 80 40 80' },
  { id: 'e', label: 'E', category: 'alphabet', description: 'La main est refermée, le bout des doigts touche le pouce replié.', svgPath: 'M30 30 L70 30 L70 45 Q70 60 50 60 Q30 60 30 45 Z' },
  { id: 'f', label: 'F', category: 'alphabet', description: 'Le pouce et l\'index forment un cercle, les trois autres doigts sont dressés.', svgPath: 'M40 40 Q40 55 55 55 Q70 55 70 40 Q70 25 55 25 Q40 25 40 40 M70 40 L90 40' },
  { id: 'g', label: 'G', category: 'alphabet', description: 'Le pouce et l\'index sont parallèles comme pour mesurer quelque chose de petit.', svgPath: 'M30 40 L70 40 M30 55 L70 55' },
  { id: 'h', label: 'H', category: 'alphabet', description: 'L\'index et le majeur sont dressés horizontalement.', svgPath: 'M30 40 L80 40 M30 55 L80 55' },
  { id: 'i', label: 'I', category: 'alphabet', description: 'Le petit doigt est dressé verticalement.', svgPath: 'M50 80 L50 30 M50 20 L50 22' },
  { id: 'j', label: 'J', category: 'alphabet', description: 'Le petit doigt dessine la lettre J dans l\'air.', svgPath: 'M50 30 L50 70 Q50 85 35 85' },
  { id: 'k', label: 'K', category: 'alphabet', description: 'L\'index et le majeur sont dressés, le pouce touche le majeur.', svgPath: 'M40 80 L60 20 M60 80 L40 20' },
  { id: 'l', label: 'L', category: 'alphabet', description: 'L\'index est dressé verticalement, le pouce horizontalement.', svgPath: 'M30 20 L30 70 L70 70' },
  { id: 'm', label: 'M', category: 'alphabet', description: 'Les trois doigts (index, majeur, annulaire) sont repliés vers le bas.', svgPath: 'M30 80 L30 40 Q30 20 45 40 L45 80 M45 40 Q45 20 60 40 L60 80' },
  { id: 'n', label: 'N', category: 'alphabet', description: 'L\'index et le majeur sont repliés vers le bas.', svgPath: 'M30 80 L30 40 Q30 20 50 40 L50 80' },
  { id: 'o', label: 'O', category: 'alphabet', description: 'Tous les doigts forment un cercle avec le pouce.', svgPath: 'M50 20 Q80 20 80 50 Q80 80 50 80 Q20 80 20 50 Q20 20 50 20' },
  { id: 'p', label: 'P', category: 'alphabet', description: 'Similaire au K mais pointant vers le bas.', svgPath: 'M40 20 L60 80 M60 20 L40 80' },
  { id: 'q', label: 'Q', category: 'alphabet', description: 'Similaire au G mais pointant vers le bas.', svgPath: 'M40 30 L40 70 M55 30 L55 70' },
  { id: 'r', label: 'R', category: 'alphabet', description: 'L\'index et le majeur sont croisés.', svgPath: 'M40 80 L60 20 M35 70 Q50 50 65 70' },
  { id: 's', label: 'S', category: 'alphabet', description: 'Le poing est fermé, le pouce devant les doigts.', svgPath: 'M30 40 Q30 70 50 70 Q70 70 70 40 Q70 20 50 20 Q30 20 30 40 Z' },
  { id: 't', label: 'T', category: 'alphabet', description: 'Le poing est fermé, le pouce est inséré entre l\'index et le majeur.', svgPath: 'M30 40 L70 40 L50 80 Z' },
  { id: 'u', label: 'U', category: 'alphabet', description: 'L\'index et le majeur sont dressés et serrés.', svgPath: 'M40 80 L40 30 M55 80 L55 30' },
  { id: 'v', label: 'V', category: 'alphabet', description: 'L\'index et le majeur sont dressés et écartés.', svgPath: 'M30 30 L50 80 L70 30' },
  { id: 'w', label: 'W', category: 'alphabet', description: 'L\'index, le majeur et l\'annulaire sont dressés et écartés.', svgPath: 'M30 30 L40 80 L50 30 L60 80 L70 30' },
  { id: 'x', label: 'X', category: 'alphabet', description: 'L\'index est recourbé comme un crochet.', svgPath: 'M30 80 L30 40 Q30 20 50 20 Q70 20 70 40' },
  { id: 'y', label: 'Y', category: 'alphabet', description: 'Le pouce et le petit doigt sont dressés, les autres repliés.', svgPath: 'M20 30 L40 70 L80 30' },
  { id: 'z', label: 'Z', category: 'alphabet', description: 'L\'index dessine un Z dans l\'air.', svgPath: 'M30 30 L70 30 L30 70 L70 70' },

  // Numbers
  { id: 'n1', label: '1', category: 'numbers', description: 'L\'index est dressé.', svgPath: 'M50 80 L50 20' },
  { id: 'n2', label: '2', category: 'numbers', description: 'L\'index et le majeur sont dressés.', svgPath: 'M40 80 L40 20 M60 80 L60 20' },
  { id: 'n3', label: '3', category: 'numbers', description: 'Le pouce, l\'index et le majeur sont dressés.', svgPath: 'M30 50 L20 40 M40 80 L40 20 M60 80 L60 20' },
  { id: 'n4', label: '4', category: 'numbers', description: 'Quatre doigts sont dressés (sauf le pouce).', svgPath: 'M30 80 L30 25 M45 80 L45 20 M60 80 L60 20 M75 80 L75 25' },
  { id: 'n5', label: '5', category: 'numbers', description: 'La main est ouverte avec tous les doigts dressés.', svgPath: 'M20 50 L10 40 M30 80 L30 20 M45 80 L45 15 M60 80 L60 20 M75 80 L75 30' },

  // Greetings
  { id: 'hello', label: 'Bonjour', category: 'greetings', description: 'Le bout des doigts de la main droite touche le front puis s\'écarte vers l\'avant.', svgPath: 'M30 30 Q50 10 70 30 L70 70 Q50 90 30 70 Z' },
  { id: 'thanks', label: 'Merci', category: 'greetings', description: 'La main part du menton et s\'avance vers le bas devant soi.', svgPath: 'M50 30 L50 70 M30 50 L70 50' },
  { id: 'please', label: 'S\'il vous plaît', category: 'greetings', description: 'La main plate sur la poitrine effectue un mouvement circulaire.', svgPath: 'M50 50 m-30 0 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0' },
  { id: 'sorry', label: 'Désolé', category: 'greetings', description: 'Le poing fermé effectue un mouvement circulaire sur la poitrine.', svgPath: 'M50 50 m-20 0 a20 20 0 1 0 40 0 a20 20 0 1 0 -40 0' },
  
  // Family
  { id: 'mother', label: 'Maman', category: 'family', description: 'L\'index tapote la joue deux fois.', svgPath: 'M30 40 Q30 70 50 80 M40 50 L40 60' },
  { id: 'father', label: 'Papa', category: 'family', description: 'L\'index et le majeur forment un V sur le front.', svgPath: 'M40 20 L50 40 L60 20' },
  { id: 'brother', label: 'Frère', category: 'family', description: 'Les deux index se rejoignent horizontalement.', svgPath: 'M30 50 L45 50 M55 50 L70 50' },
  { id: 'sister', label: 'Sœur', category: 'family', description: 'Le pouce frotte le menton vers l\'avant.', svgPath: 'M50 70 Q60 70 70 60 L70 50' },

  // Questions
  { id: 'who', label: 'Qui ?', category: 'questions', description: 'L\'index devant la bouche fait un petit cercle.', svgPath: 'M50 40 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0' },
  { id: 'what', label: 'Quoi ?', category: 'questions', description: 'Les deux mains ouvertes paumes vers le haut s\'écartent.', svgPath: 'M30 60 L45 60 M55 60 L70 60' },
  { id: 'where', label: 'Où ?', category: 'questions', description: 'L\'index pointe de gauche à droite plusieurs fois.', svgPath: 'M30 50 L70 50' },
  { id: 'how', label: 'Comment ?', category: 'questions', description: 'Les deux mains en forme de C pivotent vers l\'extérieur.', svgPath: 'M30 40 Q45 30 60 40 M30 60 Q45 70 60 60' },

  // Feelings
  { id: 'happy', label: 'Heureux', category: 'feelings', description: 'Les mains plates montent le long de la poitrine alternativement.', svgPath: 'M50 20 Q70 40 50 60 Q30 40 50 20' },
  { id: 'sad', label: 'Triste', category: 'feelings', description: 'La main descend lentement devant le visage avec une expression triste.', svgPath: 'M30 30 L50 80 L70 30' },
  { id: 'tired', label: 'Fatigué', category: 'feelings', description: 'Les mains sur les épaules tombent vers le bas.', svgPath: 'M30 30 L40 50 M70 30 L60 50' },

  // Emergency
  { id: 'help', label: 'Aide', category: 'emergency', description: 'Le poing fermé repose sur la paume plate de l\'autre main.', svgPath: 'M50 40 L50 60 M30 70 L70 70' },
  { id: 'danger', label: 'Danger', category: 'emergency', description: 'Les deux index se croisent brusquement.', svgPath: 'M40 40 L60 60 M60 40 L40 60' },
  { id: 'doctor', label: 'Docteur', category: 'emergency', description: 'Deux doigts tapotent le poignet (pouls).', svgPath: 'M70 70 Q80 70 80 50 L80 30 M60 70 L60 80' },

  // Common Words
  { id: 'house', label: 'Maison', category: 'common', description: 'Les mains forment un toit au-dessus de la tête.', svgPath: 'M30 60 L50 30 L70 60 L70 85 L30 85 Z' },
  { id: 'school', label: 'École', category: 'common', description: 'Les deux mains tapent l\'une contre l\'autre comme pour applaudir.', svgPath: 'M30 40 L50 60 L70 40 M30 80 L70 80' },
  { id: 'food', label: 'Manger', category: 'common', description: 'Le bout des doigts réunis touche la bouche plusieurs fois.', svgPath: 'M50 70 Q50 40 40 40 Q30 40 30 50 Z' },
  { id: 'water', label: 'Eau', category: 'common', description: 'L\'index touche le coin de la bouche plusieurs fois.', svgPath: 'M50 20 Q70 50 50 80 Q30 50 50 20' },
  { id: 'work', label: 'Travail', category: 'common', description: 'Le poing de la main droite tape le poignet de la main gauche.', svgPath: 'M40 70 L60 70 M50 60 L50 80' },
  { id: 'love', label: 'Amour', category: 'common', description: 'Les bras sont croisés sur la poitrine.', svgPath: 'M50 40 Q70 20 85 40 Q85 70 50 90 Q15 70 15 40 Q30 20 50 40' },
  { id: 'friend', label: 'Ami', category: 'common', description: 'Les deux mains se serrent.', svgPath: 'M30 50 Q50 30 70 50 M30 70 Q50 90 70 70' },
  { id: 'yes', label: 'Oui', category: 'common', description: 'Le poing fermé effectue un mouvement de haut en bas.', svgPath: 'M50 30 L50 70 L40 60 M50 70 L60 60' },
  { id: 'no', label: 'Non', category: 'common', description: 'L\'index et le majeur claquent contre le pouce.', svgPath: 'M30 30 L70 70 M70 30 L30 70' }
];

export const categories = [
  { id: 'all', label: 'Tout' },
  { id: 'alphabet', label: 'Alphabet' },
  { id: 'numbers', label: 'Chiffres' },
  { id: 'greetings', label: 'Salutations' },
  { id: 'family', label: 'Famille' },
  { id: 'questions', label: 'Questions' },
  { id: 'feelings', label: 'Émotions' },
  { id: 'emergency', label: 'Urgence' },
  { id: 'common', label: 'Mots Courants' }
];
