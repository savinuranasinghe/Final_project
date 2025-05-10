import { db, storage, auth } from './firebaseConfig';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  doc, 
  deleteDoc,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';

// Types for our history data
export interface HistoryItem {
  id?: string;
  userId: string;
  imageUrl: string;
  disease: string;
  confidence: number;
  severity: string;
  timestamp: Date;
  notes?: string;
}

// Ensure user is signed in (anonymously if needed)
const ensureAuthentication = async () => {
  if (!auth.currentUser) {
    try {
      console.log('No user found, signing in anonymously');
      await signInAnonymously(auth);
      console.log('Anonymous sign-in successful');
    } catch (error) {
      console.error('Error signing in anonymously:', error);
      throw new Error('Failed to authenticate: ' + error);
    }
  }
  return auth.currentUser;
};

// Save detection result to history
export const saveToHistory = async (
  imageUri: string,
  disease: string,
  confidence: number,
  severity: string,
  notes?: string
): Promise<string | null> => {
  try {
    // Ensure we have a user (anonymous or signed in)
    const currentUser = await ensureAuthentication();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    // Upload image to Firebase Storage
    const imageBlob = await (await fetch(imageUri)).blob();
    const imagePath = `disease_images/${currentUser.uid}/${Date.now()}.jpg`;
    const imageRef = ref(storage, imagePath);
    await uploadBytes(imageRef, imageBlob);
    
    // Get download URL for the uploaded image
    const imageUrl = await getDownloadURL(imageRef);
    
    // Save detection data to Firestore
    const historyRef = collection(db, 'diseaseHistory');
    const historyData = {
      userId: currentUser.uid,
      imageUrl,
      disease,
      confidence,
      severity,
      timestamp: Timestamp.now(),
      notes: notes || ''
    };
    
    const docRef = await addDoc(historyRef, historyData);
    console.log('Saved to history with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving to history:', error);
    return null;
  }
};

// Get user's disease detection history
export const getUserHistory = async (): Promise<HistoryItem[]> => {
  try {
    // Ensure we have a user (anonymous or signed in)
    const currentUser = await ensureAuthentication();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    console.log('Getting history for user:', currentUser.uid);
    
    // Query Firestore for user's history
    const historyRef = collection(db, 'diseaseHistory');
    const q = query(
      historyRef,
      where('userId', '==', currentUser.uid),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const historyItems: HistoryItem[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      historyItems.push({
        id: doc.id,
        userId: data.userId,
        imageUrl: data.imageUrl,
        disease: data.disease,
        confidence: data.confidence,
        severity: data.severity,
        timestamp: data.timestamp.toDate(),
        notes: data.notes
      });
    });
    
    console.log('Found history items:', historyItems.length);
    return historyItems;
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};

// Delete a history item
export const deleteHistoryItem = async (id: string): Promise<boolean> => {
  try {
    // Ensure we have a user (anonymous or signed in)
    const currentUser = await ensureAuthentication();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    // Delete document from Firestore
    await deleteDoc(doc(db, 'diseaseHistory', id));
    console.log('Deleted history item:', id);
    return true;
  } catch (error) {
    console.error('Error deleting history item:', error);
    return false;
  }
};