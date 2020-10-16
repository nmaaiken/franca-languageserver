package org.franca.example.lsp.ui;

import org.eclipse.xtext.documentation.IEObjectDocumentationProvider;
import org.eclipse.xtext.ide.editor.syntaxcoloring.AbstractAntlrTokenToAttributeIdMapper;
import org.eclipse.xtext.ide.editor.syntaxcoloring.ISemanticHighlightingCalculator;
import org.eclipse.xtext.service.AbstractGenericModule;
import org.eclipse.xtext.ui.editor.contentassist.PrefixMatcher;
import org.eclipse.xtext.ui.editor.contentassist.XtextContentAssistProcessor;
import org.eclipse.xtext.ui.editor.syntaxcoloring.IHighlightingConfiguration;
import org.franca.core.dsl.ide.highlighting.FrancaSemanticHighlightingCalculator;
import org.franca.core.dsl.ui.*;
import org.franca.core.dsl.ui.contentassist.FrancaProposalPrefixMatcher;
import org.franca.core.dsl.ui.highlighting.FrancaAntlrTokenToAttributeIdMapper;
import org.franca.core.dsl.ui.highlighting.FrancaHighlightingConfiguration;

import com.google.inject.Binder;
import com.google.inject.name.Names;


public class FrancaIDLLspUiModule extends AbstractGenericModule {
	
	  @Override
	  public void configure(final Binder binder) {
	    super.configure(binder);
	    binder.<String>bind(String.class).annotatedWith(
	      Names.named(XtextContentAssistProcessor.COMPLETION_AUTO_ACTIVATION_CHARS)).toInstance(":");
	  }
	  
	  public Class<? extends IHighlightingConfiguration> bindSemanticConfig() {
	    return FrancaHighlightingConfiguration.class;
	  }
	  
	  public Class<? extends ISemanticHighlightingCalculator> bindSemanticHighlightingCalculator() {
	    return FrancaSemanticHighlightingCalculator.class;
	  }
	  
	  public Class<? extends AbstractAntlrTokenToAttributeIdMapper> bindAbstractAntlrTokenToAttributeIdMapper() {
	    return FrancaAntlrTokenToAttributeIdMapper.class;
	  }
	  
	  public Class<? extends PrefixMatcher> bindPrefixMatcher() {
	    return FrancaProposalPrefixMatcher.class;
	  }
	  
	  public Class<? extends IEObjectDocumentationProvider> bindIEObjectDocumentationProviderr() {
	    return FrancaIDLDocumentationProvider.class;
	  }

}
