import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';

export const App = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [content, setContent] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getArticle = async () => {
    if (!inputUrl.trim()) return;

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch('https://withoutthestory.netlify.app/.netlify/functions/get-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }

      const data = await response.json();
      setContent(data.recipe || 'No content found');
    } catch (err) {
      setError('An error occurred while fetching the recipe');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const openSupportLink = () => {
    Linking.openURL('https://buymeacoffee.com/toxey');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Simmer.AI</Text>
          <Text style={styles.subtitle}>
            Get recipes and instructions without reading through noise
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputUrl}
            onChangeText={setInputUrl}
            placeholder="Recipe URL or Dish Name"
            placeholderTextColor="#9CA3AF"
            editable={!processing}
          />
          <TouchableOpacity
            style={[styles.button, (!inputUrl.trim() || processing) && styles.buttonDisabled]}
            onPress={getArticle}
            disabled={!inputUrl.trim() || processing}
          >
            {processing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Get Recipe</Text>
            )}
          </TouchableOpacity>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {processing && (
          <View style={styles.contentCard}>
            <View style={styles.skeleton}>
              <View style={styles.skeletonLine} />
              <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
              <View style={styles.skeletonLine} />
              <View style={styles.skeletonLine} />
            </View>
          </View>
        )}

        {!processing && content && (
          <View style={styles.contentCard}>
            <Text style={styles.contentText}>{content}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <TouchableOpacity style={styles.supportButton} onPress={openSupportLink}>
            <Text style={styles.supportButtonText}>👍 Support Me</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    marginHorizontal: 20,
    padding: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F87171',
    marginBottom: 16,
  },
  errorText: {
    color: '#991B1B',
    fontSize: 14,
  },
  contentCard: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#1F2937',
  },
  skeleton: {
    gap: 12,
  },
  skeletonLine: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  skeletonLineShort: {
    width: '60%',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  supportButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;

