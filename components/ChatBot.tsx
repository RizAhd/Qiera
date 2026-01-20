import icons from '@/constants/icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const FAQ_QUESTIONS = [
  {
    id: '1',
    question: 'How do I book a property?',
    answer: 'Click on any property card, then tap the "Book Now" button at the bottom of the property details page. Our agent will contact you shortly.',
  },
  {
    id: '2',
    question: 'Can I schedule a property visit?',
    answer: 'Yes! After booking, you can schedule a visit through the "My Bookings" section in your profile.',
  },
  {
    id: '3',
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards, bank transfers, and mobile payments through our secure payment gateway.',
  },
  {
    id: '4',
    question: 'How do I save a property?',
    answer: 'Tap the heart icon on any property card or property details page to save it for later. View all saved properties in the "Saved" tab.',
  },
  {
    id: '5',
    question: 'Are utilities included in the rent?',
    answer: 'It depends on the property. Check the property description or contact the agent for specific utility details.',
  },
  {
    id: '6',
    question: 'What is your cancellation policy?',
    answer: 'Bookings can be cancelled up to 48 hours before the scheduled visit for a full refund.',
  },
];

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your Qiera assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const findAnswer = (question: string): string => {
    const normalizedQuestion = question.toLowerCase();
    
    // Keyword matching for common queries
    if (normalizedQuestion.includes('book') || normalizedQuestion.includes('reserve')) {
      return FAQ_QUESTIONS[0].answer;
    }
    if (normalizedQuestion.includes('visit') || normalizedQuestion.includes('tour')) {
      return FAQ_QUESTIONS[1].answer;
    }
    if (normalizedQuestion.includes('payment') || normalizedQuestion.includes('pay')) {
      return FAQ_QUESTIONS[2].answer;
    }
    if (normalizedQuestion.includes('save') || normalizedQuestion.includes('favorite')) {
      return FAQ_QUESTIONS[3].answer;
    }
    if (normalizedQuestion.includes('utility') || normalizedQuestion.includes('bill')) {
      return FAQ_QUESTIONS[4].answer;
    }
    if (normalizedQuestion.includes('cancel') || normalizedQuestion.includes('refund')) {
      return FAQ_QUESTIONS[5].answer;
    }
    
    // Default response if no match
    return 'I can help with booking, payments, property visits, and general inquiries. Try asking about one of these topics or tap on a suggested question above!';
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    // Find bot response
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: findAnswer(inputText),
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputText('');
    
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date(),
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: findAnswer(question),
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const MessageBubble = ({ item }: { item: Message }) => (
    <View className={`flex-row mb-4 ${item.isUser ? 'justify-end' : 'justify-start'}`}>
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          item.isUser
            ? 'bg-blue-600 rounded-br-none'
            : 'bg-gray-100 rounded-bl-none'
        }`}
      >
        <Text
          className={`text-sm ${
            item.isUser ? 'text-white' : 'text-gray-800'
          } font-rubik`}
        >
          {item.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            item.isUser ? 'text-blue-200' : 'text-gray-500'
          }`}
        >
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      {/* Floating Chat Button */}
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="absolute bottom-24 right-5 z-50 bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Image source={icons.chat} className="w-7 h-7" tintColor="#fff" />
      </TouchableOpacity>

      {/* Chat Modal */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className={`absolute bottom-0 right-0 left-0 bg-white rounded-t-3xl z-40 ${
          isOpen ? 'h-3/4' : 'h-0'
        }`}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
              <Image source={icons.chat} className="w-6 h-6" tintColor="#036b89" />
            </View>
            <View className="ml-3">
              <Text className="text-lg font-rubikBold text-black">Qiera Assistant</Text>
              <Text className="text-xs text-gray-500">Usually replies instantly</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setIsOpen(false)}>
            <Text className="text-blue-600 font-rubikBold">Close</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Questions */}
        <View className="px-4 py-3 border-b border-gray-100">
          <Text className="text-sm font-rubikMedium text-gray-700 mb-2">
            Quick questions you can ask:
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={FAQ_QUESTIONS}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleQuickQuestion(item.question)}
                className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 mr-2"
              >
                <Text className="text-xs text-blue-800 font-rubik" numberOfLines={2}>
                  {item.question}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Messages */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={MessageBubble}
            keyExtractor={(item) => item.id}
            className="flex-1 px-4 pt-4"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {/* Input Area */}
          <View className="flex-row items-center px-4 py-3 border-t border-gray-200">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your question..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-3 font-rubik text-black"
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={handleSend}
              className="ml-3 bg-blue-600 w-12 h-12 rounded-full items-center justify-center"
            >
              <Image source={icons.send} className="w-5 h-5" tintColor="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>

      {/* Backdrop */}
      {isOpen && (
        <TouchableOpacity
          className="absolute inset-0 bg-black/50 z-30"
          onPress={() => setIsOpen(false)}
          activeOpacity={1}
        />
      )}
    </>
  );
};

export default ChatBot;