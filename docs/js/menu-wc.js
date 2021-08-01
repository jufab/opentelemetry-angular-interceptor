'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">OpenTelemetry Angular Interceptor</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/B3PropagatorModule.html" data-type="entity-link" >B3PropagatorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CompositePropagatorModule.html" data-type="entity-link" >CompositePropagatorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConsoleSpanExporterModule.html" data-type="entity-link" >ConsoleSpanExporterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HttpTraceContextPropagatorModule.html" data-type="entity-link" >HttpTraceContextPropagatorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/JaegerHttpTracePropagatorModule.html" data-type="entity-link" >JaegerHttpTracePropagatorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NoopTextMapPropagatorModule.html" data-type="entity-link" >NoopTextMapPropagatorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OpenTelemetryInterceptorModule.html" data-type="entity-link" >OpenTelemetryInterceptorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OtelColExporterModule.html" data-type="entity-link" >OtelColExporterModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OtelWebTracerModule.html" data-type="entity-link" >OtelWebTracerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OtelWebTracerModule-95b06fb782d3f28e88fa34204e9fbb15"' : 'data-target="#xs-components-links-module-OtelWebTracerModule-95b06fb782d3f28e88fa34204e9fbb15"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OtelWebTracerModule-95b06fb782d3f28e88fa34204e9fbb15"' :
                                            'id="xs-components-links-module-OtelWebTracerModule-95b06fb782d3f28e88fa34204e9fbb15"' }>
                                            <li class="link">
                                                <a href="components/OtelWebTracerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OtelWebTracerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ZipkinExporterModule.html" data-type="entity-link" >ZipkinExporterModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/B3PropagatorService.html" data-type="entity-link" >B3PropagatorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompositePropagatorService.html" data-type="entity-link" >CompositePropagatorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConsoleSpanExporterService.html" data-type="entity-link" >ConsoleSpanExporterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpTraceContextPropagatorService.html" data-type="entity-link" >HttpTraceContextPropagatorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InstrumentationService.html" data-type="entity-link" >InstrumentationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JaegerHttpTracePropagatorService.html" data-type="entity-link" >JaegerHttpTracePropagatorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NoopTextMapPropagatorService.html" data-type="entity-link" >NoopTextMapPropagatorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OtelcolExporterService.html" data-type="entity-link" >OtelcolExporterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZipkinExporterService.html" data-type="entity-link" >ZipkinExporterService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/OpenTelemetryHttpInterceptor.html" data-type="entity-link" >OpenTelemetryHttpInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/B3PropagatorConfig.html" data-type="entity-link" >B3PropagatorConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BatchSpanProcessorConfig.html" data-type="entity-link" >BatchSpanProcessorConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommonCollectorConfig.html" data-type="entity-link" >CommonCollectorConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomSpan.html" data-type="entity-link" >CustomSpan</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExporter.html" data-type="entity-link" >IExporter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InstrumentationConfig.html" data-type="entity-link" >InstrumentationConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPropagator.html" data-type="entity-link" >IPropagator</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JaegerPropagatorConfig.html" data-type="entity-link" >JaegerPropagatorConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OpenTelemetryConfig.html" data-type="entity-link" >OpenTelemetryConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OtelCollectorConfig.html" data-type="entity-link" >OtelCollectorConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ZipkinCollectorConfig.html" data-type="entity-link" >ZipkinCollectorConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});