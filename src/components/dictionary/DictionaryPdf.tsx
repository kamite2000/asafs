import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Path, Font } from '@react-pdf/renderer';
import { dictionaryData, DictionaryItem, categories } from '../../data/dictionaryData';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#3B82F6',
    paddingBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#F8FAFC',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: '30%',
    margin: '1.5%',
    padding: 10,
    border: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 130,
  },
  svgContainer: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    fontSize: 7,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 1.3,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#94A3B8',
    borderTop: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
  }
});

interface DictionaryPdfProps {
  items: DictionaryItem[];
}

export const DictionaryPdf = ({ items }: DictionaryPdfProps) => {
  // Group items by category for the PDF
  const grouped = categories.reduce((acc, cat) => {
    if (cat.id === 'all') return acc;
    const catItems = items.filter(item => item.category === cat.id);
    if (catItems.length > 0) {
      acc.push({ label: cat.label, items: catItems });
    }
    return acc;
  }, [] as Array<{ label: string, items: DictionaryItem[] }>);

  return (
    <Document title="Manuel LSF - ASAFS">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Manuel d'Apprentissage LSF</Text>
          <Text style={styles.subtitle}>Action Solidaire pour l'Autonomisation des Femmes Sourdes (ASAFS RDC)</Text>
        </View>

        {grouped.map((group, idx) => (
          <View key={idx} wrap={false}>
            <Text style={styles.sectionTitle}>{group.label}</Text>
            <View style={styles.grid}>
              {group.items.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.svgContainer}>
                    <Svg viewBox="0 0 100 100">
                      <Path
                        d={item.svgPath}
                        stroke="#3B82F6"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.footer} fixed>
          © {new Date().getFullYear()} ASAFS RDC - Document Pédagogique d'Inclusion Sociale
        </Text>
      </Page>
    </Document>
  );
};
