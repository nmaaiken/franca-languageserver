package org.franca.example.lsp.ui;

import org.eclipse.xtext.ISetup;
import org.franca.core.dsl.ui.FrancaIDLUiModuleWithoutJDT;

import com.google.inject.Injector;
import com.google.inject.Guice;


class FrancaIDLUiSetup implements ISetup {
	
	public static void doSetup() {
		new FrancaIDLUiSetup().createInjectorAndDoEMFRegistration();
	}
	
	@Override
	public Injector createInjectorAndDoEMFRegistration() {
		Injector injector = createInjector();
		register(injector);
		return injector;
		
	}
	
	public Injector createInjector() {
		return Guice.createInjector();
	}
}